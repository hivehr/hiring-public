import { mockSurvey } from "@hive/lib-survey";
import { program } from "commander";
import { writeFile } from "fs/promises";
import { join } from "path";

const DEFAULT_FILENAME = join(__dirname, "..", "mongodb", "seed.js");

export const createSeedFile = async (
    fileName: string,
    count = 100
): Promise<void> => {
    const surveys = [...new Array(count)].map(() => mockSurvey());

    const output = `
db.surveys.drop();
db.surveys.insertMany(${JSON.stringify(surveys, null, 2)});
    `.trim();

    await writeFile(fileName, output);
};

if (require.main === module) {
    program
        .arguments("[count] [filename]")
        .description(
            "Generates a mongodb JS script that will seed surveys if called"
        )
        .action((count = 100, filename = DEFAULT_FILENAME) => {
            createSeedFile(filename, count);
        });

    program.parseAsync(process.argv).catch(e => {
        console.error(e.message);
        process.exit(1);
    });
}
