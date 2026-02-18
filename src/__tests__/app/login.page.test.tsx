import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "@/app/(site)/login/page";

describe("LoginPage", () => {
    it("renders email and password fields", () => {
        render(<LoginPage />);

        expect(screen.getByLabelText(/email/i)).toBeTruthy();
        expect(screen.getByLabelText(/password/i)).toBeTruthy();
    });

    it("toggles password visibility", () => {
        render(<LoginPage />);

        const passwordInput = screen.getByLabelText(/password/i);
        const toggleButton = screen.getByRole("button", { name: "" });

        expect((passwordInput as HTMLInputElement).type).toBe("password");
        fireEvent.click(toggleButton);
        expect((passwordInput as HTMLInputElement).type).toBe("text");
    });
});
