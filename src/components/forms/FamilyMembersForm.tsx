
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../../hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import ReusableButton from '../common/ReusableButton';

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
  mobileNumber: string;
  occupation: string;
}

const FamilyMembersForm: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      firstName: '',
      lastName: '',
      relationship: '',
      dateOfBirth: '',
      mobileNumber: '',
      occupation: '',
    }
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      relationship: '',
      dateOfBirth: '',
      mobileNumber: '',
      occupation: '',
    };
    setFamilyMembers(prev => [...prev, newMember]);
  };

  const removeFamilyMember = (id: string) => {
    if (familyMembers.length > 1) {
      setFamilyMembers(prev => prev.filter(member => member.id !== id));
    }
  };

  const updateFamilyMember = (id: string, field: keyof FamilyMember, value: string) => {
    setFamilyMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const validateForm = () => {
    for (const member of familyMembers) {
      if (!member.firstName.trim() || !member.lastName.trim() || !member.relationship || !member.dateOfBirth) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields for each family member.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Submitting family members:', familyMembers);
      
      toast({
        title: 'Success',
        description: 'Family members information has been submitted successfully.',
      });
      
      // Reset form or navigate
      setFamilyMembers([{
        id: '1',
        firstName: '',
        lastName: '',
        relationship: '',
        dateOfBirth: '',
        mobileNumber: '',
        occupation: '',
      }]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit family members information. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <Button variant="ghost" onClick={handleBack} size={isMobile ? "sm" : "default"}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Family Members</h1>
            <p className="text-sm text-gray-600">Add information for all family members</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {familyMembers.map((member, index) => (
            <Card key={member.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Family Member {index + 1}</span>
                  {familyMembers.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFamilyMember(member.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`firstName-${member.id}`}>First Name *</Label>
                    <Input
                      id={`firstName-${member.id}`}
                      value={member.firstName}
                      onChange={(e) => updateFamilyMember(member.id, 'firstName', e.target.value)}
                      placeholder="Enter first name"
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`lastName-${member.id}`}>Last Name *</Label>
                    <Input
                      id={`lastName-${member.id}`}
                      value={member.lastName}
                      onChange={(e) => updateFamilyMember(member.id, 'lastName', e.target.value)}
                      placeholder="Enter last name"
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`relationship-${member.id}`}>Relationship *</Label>
                    <Select
                      value={member.relationship}
                      onValueChange={(value) => updateFamilyMember(member.id, 'relationship', value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="father">Father</SelectItem>
                        <SelectItem value="mother">Mother</SelectItem>
                        <SelectItem value="son">Son</SelectItem>
                        <SelectItem value="daughter">Daughter</SelectItem>
                        <SelectItem value="brother">Brother</SelectItem>
                        <SelectItem value="sister">Sister</SelectItem>
                        <SelectItem value="grandfather">Grandfather</SelectItem>
                        <SelectItem value="grandmother">Grandmother</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dateOfBirth-${member.id}`}>Date of Birth *</Label>
                    <Input
                      id={`dateOfBirth-${member.id}`}
                      type="date"
                      value={member.dateOfBirth}
                      onChange={(e) => updateFamilyMember(member.id, 'dateOfBirth', e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`mobileNumber-${member.id}`}>Mobile Number</Label>
                    <Input
                      id={`mobileNumber-${member.id}`}
                      value={member.mobileNumber}
                      onChange={(e) => updateFamilyMember(member.id, 'mobileNumber', e.target.value)}
                      placeholder="Enter mobile number"
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`occupation-${member.id}`}>Occupation</Label>
                    <Input
                      id={`occupation-${member.id}`}
                      value={member.occupation}
                      onChange={(e) => updateFamilyMember(member.id, 'occupation', e.target.value)}
                      placeholder="Enter occupation"
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add More Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={addFamilyMember}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Another Family Member</span>
            </Button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleBack} disabled={loading}>
              Cancel
            </Button>
            <ReusableButton
              type="submit"
              loading={loading}
              loadingText="Submitting..."
            >
              Submit Family Information
            </ReusableButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamilyMembersForm;
