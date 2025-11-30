import { redeemVoucher } from "./src/index";

const args = process.argv.slice(2);
const phoneNumber = args[0];
const voucherCode = args[1];

if (!phoneNumber || !voucherCode) {
    console.log(JSON.stringify({
        status: {
            code: "INVALID_ARGUMENTS",
            message: "Phone number and voucher code are required."
        }
    }));
    process.exit(1);
}

try {
    const result = await redeemVoucher({ phoneNumber, voucherCode });
    console.log(JSON.stringify(result));
} catch (error) {
    console.log(JSON.stringify({
        status: {
            code: "INTERNAL_ERROR",
            message: error instanceof Error ? error.message : "Unknown error"
        }
    }));
}
