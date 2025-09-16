/**
 * 0を奇数個含んで1で終わるビット列を検査する有限オートマトン
 *
 * リファレンス: 令和07年 【春期】【秋期】 応用情報技術者 合格教本 p.30
 */

import { getInputFromStdin } from "./utils/input_from_stdin"

/**
 * 状態の有限集合
 */
enum STATUS {
    a,
    b,
    c,
}

/**
 * 入力記号の有限集合
 */
const INPUT = [0, 1]

/**
 * 初期状態
 */
const INIT_STATUS = STATUS.a

/**
 * 受理状態集合
 */
const FINAL_STATUS = [STATUS.c]

/**
 * 状態遷移関数
 */
function transition(status: STATUS, input: string): STATUS {
    if (status === STATUS.a) {
        switch (input) {
            case "0":
                return STATUS.b
        }
    }
    if (status === STATUS.b) {
        switch (input) {
            case "0":
                return STATUS.a
            case "1":
                return STATUS.c
        }
    }
    if (status === STATUS.c) {
        switch (input) {
            case "0":
                return STATUS.a
        }
    }
    return status
}

async function main() {
    const input = await getInputFromStdin("ビット列を入力してください（0と1のみ）:")

    let status = INIT_STATUS
    for (const i of input) {
        status = transition(status, i)
    }

    if (FINAL_STATUS.includes(status)) {
        console.log("受理")
    } else {
        console.log("不受理")
    }
}

main()
