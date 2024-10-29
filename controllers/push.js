const fs = require("fs").promises;
const path = require("path");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { S3_BUCKET } = require("../config/aws-config");

const { S3Client ,PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: 'us-east-1', // e.g., 'us-east-1'
});
 // Specify your region

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        const params = {
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command); // Use send method for v3
      }
    }

    console.log("All commits pushed to S3.");
  } catch (err) {
    console.error("Error pushing to S3 : ", err);
  }
}

module.exports = { pushRepo };
