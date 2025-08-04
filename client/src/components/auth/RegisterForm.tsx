import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { authService } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.enum(["farmer", "buyer"]),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
    subscribeNewsletter: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormType = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "buyer",
      agreeToTerms: false,
      subscribeNewsletter: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");
  const subscribeNewsletter = watch("subscribeNewsletter");

  const onSubmit = async (data: RegisterFormType) => {
    setIsLoading(true);

    try {
      const response = await authService.register(data);

      if (
        response.success &&
        response.data &&
        response.data.token &&
        response.data.user
      ) {
        toast.success("Account created successfully! Welcome to FarmDirect.");

        sessionStorage.setItem("auth_token", response.data.token);
        sessionStorage.setItem("auth_user", JSON.stringify(response.data.user));

        login(response.data);

        if (response.data.user.role === "farmer") {
          navigate("/farmer/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(
          response.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white">
            First Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <Input
              id="firstName"
              type="text"
              placeholder="First name"
              {...register("firstName")}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-400 focus:ring-green-400"
            />
          </div>
          {errors.firstName && (
            <p className="text-red-400 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            {...register("lastName")}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-400 focus:ring-green-400"
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-400 focus:ring-green-400"
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            {...register("phone")}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-400 focus:ring-green-400"
          />
        </div>
        {errors.phone && (
          <p className="text-red-400 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-white">I want to join as a:</Label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="buyer"
              {...register("role")}
              className="w-4 h-4 text-green-500 bg-white/10 border-white/20 focus:ring-green-400"
            />
            <span className="text-white/80">Buyer</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="farmer"
              {...register("role")}
              className="w-4 h-4 text-green-500 bg-white/10 border-white/20 focus:ring-green-400"
            />
            <span className="text-white/80">Farmer</span>
          </label>
        </div>
        {errors.role && (
          <p className="text-red-400 text-sm">{errors.role.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              {...register("password")}
              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-400 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-white">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirmPassword")}
              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-400 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) =>
              setValue("agreeToTerms", checked as boolean)
            }
            className="border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-1"
          />
          <Label
            htmlFor="terms"
            className="text-sm text-white/80 leading-relaxed"
          >
            I agree to the{" "}
            <button
              type="button"
              className="text-green-400 hover:text-green-300"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-green-400 hover:text-green-300"
            >
              Privacy Policy
            </button>
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-400 text-sm">{errors.agreeToTerms.message}</p>
        )}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="newsletter"
            checked={subscribeNewsletter}
            onCheckedChange={(checked) =>
              setValue("subscribeNewsletter", checked as boolean)
            }
            className="border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
          />
          <Label htmlFor="newsletter" className="text-sm text-white/80">
            Subscribe to our newsletter for farming tips and market updates
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black text-white/60">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </Button>
      </div>

      <div className="text-center">
        <span className="text-white/70">Already have an account? </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-green-400 hover:text-green-300 font-medium"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
