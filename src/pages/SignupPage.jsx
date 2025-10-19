import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Step 1: Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",
  });

  // Step 2: Family Members
  const [familyMembers, setFamilyMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState({
    firstName: "",
    lastName: "",
    relation: "",
  });

  // Step 3: Documents
  const [documents, setDocuments] = useState({
    idFile: null,
    incomeFile: null,
  });

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleAddFamilyMember = () => {
    if (currentMember.firstName && currentMember.lastName && currentMember.relation) {
      setFamilyMembers([...familyMembers, currentMember]);
      setCurrentMember({ firstName: "", lastName: "", relation: "" });
    }
  };

  const handleRemoveFamilyMember = (index) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // In a real app, you'd submit this data to a backend
    console.log("Personal Info:", personalInfo);
    console.log("Family Members:", familyMembers);
    console.log("Documents:", documents);
    alert("Sign up successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Pickwell Logo" className="h-16 w-16 mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 text-sm mt-2">Step {step} of 3</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className={`text-xs ${step >= 1 ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>Personal Info</span>
            <span className={`text-xs ${step >= 2 ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>Family Members</span>
            <span className={`text-xs ${step >= 3 ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>Documents</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select
                  name="gender"
                  value={personalInfo.gender}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={personalInfo.dateOfBirth}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
              <input
                type="text"
                name="streetAddress"
                value={personalInfo.streetAddress}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={personalInfo.city}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                <select
                  name="province"
                  value={personalInfo.province}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={personalInfo.postalCode}
                  onChange={handlePersonalInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="A1A 1A1"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Family Members */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Family Members (Optional)</h2>
            
            {/* Display added family members */}
            {familyMembers.length > 0 && (
              <div className="mb-4 space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Added Members:</h3>
                {familyMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm">
                      <span className="font-medium">{member.firstName} {member.lastName}</span>
                      <span className="text-gray-600 ml-2">({member.relation})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFamilyMember(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new family member */}
            <div className="border border-dashed border-gray-300 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Add Family Member</h3>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={currentMember.firstName}
                    onChange={(e) => setCurrentMember({ ...currentMember, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={currentMember.lastName}
                    onChange={(e) => setCurrentMember({ ...currentMember, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                <select
                  value={currentMember.relation}
                  onChange={(e) => setCurrentMember({ ...currentMember, relation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select</option>
                  <option value="spouse">Spouse</option>
                  <option value="partner">Partner</option>
                  <option value="child">Child</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleAddFamilyMember}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                + Add Member
              </button>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Upload Documents</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Document *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  name="idFile"
                  onChange={handleFileChange}
                  className="hidden"
                  id="idFile"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label htmlFor="idFile" className="cursor-pointer">
                  <div className="text-gray-600">
                    {documents.idFile ? (
                      <div>
                        <span className="text-green-600 font-medium">✓ {documents.idFile.name}</span>
                        <p className="text-xs mt-1">Click to change</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl">📄</span>
                        <p className="mt-2">Click to upload ID</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Proof of Income *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  name="incomeFile"
                  onChange={handleFileChange}
                  className="hidden"
                  id="incomeFile"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label htmlFor="incomeFile" className="cursor-pointer">
                  <div className="text-gray-600">
                    {documents.incomeFile ? (
                      <div>
                        <span className="text-green-600 font-medium">✓ {documents.incomeFile.name}</span>
                        <p className="text-xs mt-1">Click to change</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl">📄</span>
                        <p className="mt-2">Click to upload proof of income</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!documents.idFile || !documents.incomeFile}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Complete Sign Up
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Already have an account? <a href="/login" className="text-green-600 hover:underline">Login</a></p>
        </div>
      </div>
    </div>
  );
}
