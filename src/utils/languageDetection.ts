import { ModelOperations } from "@vscode/vscode-languagedetection";

const modulOperations = new ModelOperations();
export const detectLanguage = async (codeSnippet: string) => {
    const result = await modulOperations.runModel(codeSnippet);
    if (result && result.length > 0) {
        return result[0]?.languageId;
    }
    return 'unknown'


}