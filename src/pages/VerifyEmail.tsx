import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, CheckCircle, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail, sendActivationEmail } = useAuth();
  const { toast } = useToast();
  
  // Get email from location state or use empty string
  const email = location.state?.email || "";
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [activationCode, setActivationCode] = useState(""); // For demo purposes

  // For demo purposes - show the activation code that was logged to console
  useEffect(() => {
    // In a real app, this would not exist - this is just for demo
    const originalConsoleInfo = console.info;
    console.info = function(message) {
      originalConsoleInfo.apply(console, arguments);
      if (typeof message === 'string' && message.includes('[Demo Email] Activation code')) {
        const code = message.split(': ')[1];
        setActivationCode(code);
      }
    };

    return () => {
      console.info = originalConsoleInfo;
    };
  }, []);

  // Handle countdown for resend button
  useEffect(() => {
    let timer: number | undefined;
    if (resendCountdown > 0) {
      timer = window.setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendCountdown]);

  // If no email is provided, redirect to register
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const handleVerify = () => {
    setError("");
    
    if (!verificationCode) {
      setError("Please enter the verification code");
      return;
    }
    
    if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
      setError("Please enter a valid 6-digit code");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const verified = verifyEmail(email, verificationCode);
      
      if (verified) {
        setSuccess(true);
        toast({
          title: "Email verified successfully",
          description: "Your account is now active. You can now log in.",
        });
        
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (resendDisabled) return;
    
    setResendDisabled(true);
    setResendCountdown(60); // 60 second cooldown
    
    // Generate a new code and send it
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    sendActivationEmail(email, newCode);
    
    toast({
      title: "Verification code resent",
      description: "Please check your email for the new code.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <Shield className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
          <p className="text-white/80">
            Please enter the 6-digit code sent to {email}
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>
              Enter the 6-digit code to activate your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            {success ? (
              <div className="text-center py-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Verified!</h3>
                <p className="text-muted-foreground mb-4">
                  Your account has been successfully activated.
                </p>
                <p className="text-sm">Redirecting to login...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Demo-only activation code display */}
                {activationCode && (
                  <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200">
                    <AlertDescription className="flex items-center justify-between">
                      <span>
                        <span className="font-semibold">Demo Mode:</span> Your activation code is
                      </span>
                      <code className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded font-mono text-lg">
                        {activationCode}
                      </code>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Always show helpful message about where to find the code */}
                {!activationCode && (
                  <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                    <AlertDescription>
                      <span className="font-semibold">Demo Mode:</span> Check the browser alert popup or console for your 6-digit activation code.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      // Only allow digits and max 6 characters
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setVerificationCode(value);
                    }}
                    placeholder="Enter 6-digit code"
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                    inputMode="numeric"
                  />

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button
                  onClick={handleVerify}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading || verificationCode.length !== 6}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">⟳</span> Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Verify Email <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendCode}
                className={`text-primary underline underline-offset-4 ${
                  resendDisabled ? "opacity-50 cursor-not-allowed" : "hover:text-primary/80"
                }`}
                disabled={resendDisabled}
              >
                <span className="flex items-center">
                  <RefreshCw className={`h-3 w-3 mr-1 ${resendDisabled ? "animate-spin" : ""}`} />
                  {resendDisabled
                    ? `Resend in ${resendCountdown}s`
                    : "Resend verification code"}
                </span>
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
