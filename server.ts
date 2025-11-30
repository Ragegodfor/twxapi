import { Elysia, t } from "elysia";
import { redeemVoucher } from "./src/index";

const app = new Elysia()
    .post("/redeem", async ({ body }) => {
        const { phoneNumber, voucherCode } = body;

        if (!phoneNumber || !voucherCode) {
            return {
                status: {
                    code: "INVALID_ARGUMENTS",
                    message: "Phone number and voucher code are required."
                }
            };
        }

        try {
            const result = await redeemVoucher({ phoneNumber, voucherCode });
            return result;
        } catch (error) {
            return {
                status: {
                    code: "INTERNAL_ERROR",
                    message: error instanceof Error ? error.message : "Unknown error"
                }
            };
        }
    }, {
        body: t.Object({
            phoneNumber: t.String(),
            voucherCode: t.String()
        })
    })
    .listen(3000);

console.log(`🦊 TrueMoney Wallet API is running at ${app.server?.hostname}:${app.server?.port}`);
