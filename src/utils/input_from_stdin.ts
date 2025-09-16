import readline from "readline"

export async function getInputFromStdin(message: string): Promise<string> {
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const input: string = await new Promise<string>((resolve) => {
        rl.question(message, (answer: string) => {
            rl.close()
            resolve(answer.trim())
        })
    })
    return input
}
