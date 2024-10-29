const path = require("path");
const fs = require("fs").promises; // Use the promise-based version

const add = async (filePath) => {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const stagingPath = path.join(repoPath, "staging"); // Set a proper path for the staging area

  try {
    // Create the staging directory if it doesn't exist
    await fs.mkdir(stagingPath, { recursive: true });
    
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName));

    console.log(`File ${fileName} added to the staging area!`);
  } catch (err) {
    console.error("Error adding file:", err);
  }
};

module.exports = { add };

