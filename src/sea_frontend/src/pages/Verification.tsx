
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, Clock } from 'lucide-react';

const Verification = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [verificationData, setVerificationData] = useState({
    idDocument: null,
    proofOfAddress: null,
    license: null,
    portfolio: null,
    bankDetails: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      branchCode: '',
    },
  });

  const handleFileUpload = (field: string, file: File | null) => {
    setVerificationData({ ...verificationData, [field]: file });
  };

  const handleBankDetailsChange = (field: string, value: string) => {
    setVerificationData({
      ...verificationData,
      bankDetails: {
        ...verificationData.bankDetails,
        [field]: value,
      },
    });
  };

  const handleSubmit = () => {
    console.log('Verification submitted:', verificationData);
    setStep(4); 
  };

  const handleComplete = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-hero-gradient opacity-5 animate-gradient-x"></div>
      
      <div className="w-full max-w-2xl relative z-10">
        <Card className="glass-card p-8">
          <div className="text-center mb-8">
            <Badge className="mb-4" variant="secondary">Provider Verification</Badge>
            <h1 className="text-2xl font-bold mb-2">Complete Your Verification</h1>
            <p className="text-muted-foreground">
              Step {step} of 4 - Help us verify your identity and credentials
            </p>
          </div>

          {/* Step 1: Identity Verification */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Identity Verification</h2>
                <p className="text-muted-foreground mb-6">
                  Upload a clear photo of your government-issued ID
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Government ID (Driver's License, Passport, or National ID)</Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your ID document here, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Proof of Address (Utility Bill or Bank Statement)</Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a document showing your current address
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full btn-gradient">
                Continue to Professional Credentials
              </Button>
            </div>
          )}

          {/* Step 2: Professional Credentials */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Professional Credentials</h2>
                <p className="text-muted-foreground mb-6">
                  Upload your professional licenses and portfolio
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Professional License/Certification (if applicable)</Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload your professional license or certification
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Portfolio/Work Samples</Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload photos of your previous work (up to 5 images)
                    </p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1 btn-gradient">
                  Continue to Banking
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Banking Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Banking Information</h2>
                <p className="text-muted-foreground mb-6">
                  Secure payment details for receiving your earnings
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input
                    id="accountName"
                    placeholder="Full name as it appears on your bank account"
                    value={verificationData.bankDetails.accountName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBankDetailsChange('accountName', e.target.value)}
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Your bank account number"
                    value={verificationData.bankDetails.accountNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBankDetailsChange('accountNumber', e.target.value)}
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      placeholder="Name of your bank"
                      value={verificationData.bankDetails.bankName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBankDetailsChange('bankName', e.target.value)}
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branchCode">Branch Code</Label>
                    <Input
                      id="branchCode"
                      placeholder="Branch code"
                      value={verificationData.bankDetails.branchCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBankDetailsChange('branchCode', e.target.value)}
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1 btn-gradient">
                  Submit for Review
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Verification Submitted!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for submitting your verification documents. Our team will review your application within 24-48 hours.
                </p>
              </div>

              <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div className="text-left">
                    <div className="font-medium text-blue-700">What happens next?</div>
                    <div className="text-sm text-blue-600">
                      You'll receive an email confirmation once your account is approved. You can start browsing services in the meantime!
                    </div>
                  </div>
                </div>
              </Card>

              <Button onClick={handleComplete} className="w-full btn-gradient">
                Continue to Home
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Verification;
