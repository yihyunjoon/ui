import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/base-nova/ui/input-otp";

export default function Example() {
  return (
    <InputOTP maxLength={6} aria-label="Verification code">
      <InputOTPGroup>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
