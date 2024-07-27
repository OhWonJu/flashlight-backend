import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

@Injectable()
export class UploadsService {
  private S3: S3Client;

  constructor(private configService: ConfigService) {
    const params = {
      region: this.configService.get<string>("AWS_BUCKET_REGION"),
      credentials: {
        accessKeyId: this.configService.get<string>("AWS_ACCESS_KEY"),
        secretAccessKey: this.configService.get<string>("AWS_SECRET_KEY"),
      },
    };

    this.S3 = new S3Client({ ...params });
  }

  async uploadToS3(file: any, folderName: string) {
    const bucket = this.configService.get<string>("AWS_BUCKET_NAME");
    const key = `${folderName}/${file.originalname}`;

    if (!file) return null;

    try {
      // 1. 폴더 내의 기존 파일 목록 가져오기
      const listCommand = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: folderName + "/",
      });
      const listResponse = await this.S3.send(listCommand);

      if (listResponse.Contents && listResponse.Contents.length > 0) {
        // 2. 기존 파일 삭제
        const deleteParams = {
          Bucket: bucket,
          Delete: {
            Objects: listResponse.Contents.map((item) => ({ Key: item.Key })),
          },
        };
        const deleteCommand = new DeleteObjectsCommand(deleteParams);
        await this.S3.send(deleteCommand);
      }

      // 3. 새 파일 업로드
      const putCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
      });

      await this.S3.send(putCommand);

      // AWS S3에서 리전 정보를 따로 불러오는 것이 불가능하므로, 설정된 리전을 사용하여 URL을 생성합니다.
      const region = this.configService.get<string>("AWS_BUCKET_REGION");
      const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
      return url;
    } catch (error) {
      console.log("Error", error);
    }
  }
}
