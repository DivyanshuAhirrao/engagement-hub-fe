import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  TextArea,
  Button,
  FlexBox,
  MessageStrip,
  BusyIndicator,
} from "@ui5/webcomponents-react";
import {
  PropositionRequest,
  LineOfBusiness,
  PropositionStatus,
} from "../../types/types";

import PlanSection from "@components/PlanSection";
import {
  validatePropositionName,
  validateBasePremium,
} from "@utils/validators";
import { propositionsApi } from "mockData";

const CreateProposition: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<PropositionRequest>({
    name: "",
    lineOfBusiness: LineOfBusiness.TRAVEL,
    status: PropositionStatus.DRAFT,
    description: "",
    plans: [],
  });

  const [errors, setErrors] = useState<{
    name?: string;
    plans?: Record<number, { name?: string; basePremium?: string }>;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: any = {};

    const nameError = validatePropositionName(formData.name);
    if (nameError) {
      newErrors.name = nameError;
    }

    const planErrors: Record<number, any> = {};
    formData.plans.forEach((plan, index) => {
      const planNameError = plan.name.trim() ? null : "Plan name is required";
      const premiumError = validateBasePremium(plan.basePremium);

      if (planNameError || premiumError) {
        planErrors[index] = {
          name: planNameError || undefined,
          basePremium: premiumError || undefined,
        };
      }
    });

    if (Object.keys(planErrors).length > 0) {
      newErrors.plans = planErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fix the validation errors");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const created = await propositionsApi.create(formData);
      setSuccess(true);
      setTimeout(() => navigate(`/propositions/${created.id}`), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create proposition");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <FlexBox
        justifyContent="SpaceBetween"
        alignItems="Center"
        style={{ marginBottom: "2rem" }}
      >
        <Title level="H2">Create New Proposition</Title>
        <Button design="Transparent" onClick={() => navigate("/propositions")}>
          Cancel
        </Button>
      </FlexBox>

      {error && (
        <MessageStrip design="Negative" style={{ marginBottom: "1rem" }}>
          {error}
        </MessageStrip>
      )}

      {success && (
        <MessageStrip design="Positive" style={{ marginBottom: "1rem" }}>
          Proposition created successfully! Redirecting...
        </MessageStrip>
      )}

      <form onSubmit={handleSubmit}>
        <Form>
          <FormItem>
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              required
              value={formData.name}
              onInput={(e: any) =>
                setFormData({ ...formData, name: e.target.value })
              }
              //   valueState={errors.name ? "Error" : "None"}
              //   valueStateMessage={errors.name}
            />
          </FormItem>

          <FormItem>
            <label htmlFor="lineOfBusiness">Line of Business</label>
            <Select
              id="lineOfBusiness"
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  lineOfBusiness: e.detail.selectedOption.value,
                })
              }
            >
              {Object.values(LineOfBusiness).map((lob) => (
                <Option
                  key={lob}
                  value={lob}
                  selected={lob === formData.lineOfBusiness}
                >
                  {lob}
                </Option>
              ))}
            </Select>
          </FormItem>

          <FormItem>
            <label htmlFor="status">Status</label>
            <Select
              id="status"
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  status: e.detail.selectedOption.value,
                })
              }
            >
              {Object.values(PropositionStatus).map((status) => (
                <Option
                  key={status}
                  value={status}
                  selected={status === formData.status}
                >
                  {status}
                </Option>
              ))}
            </Select>
          </FormItem>

          <FormItem>
            <label htmlFor="description">Description</label>
            <TextArea
              id="description"
              value={formData.description}
              onInput={(e: any) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
            />
          </FormItem>
        </Form>

        <PlanSection
          plans={formData.plans}
          onPlansChange={(plans) => setFormData({ ...formData, plans })}
          errors={errors.plans}
        />

        <FlexBox
          justifyContent="End"
          style={{ marginTop: "2rem", gap: "1rem" }}
        >
          <Button onClick={() => navigate("/propositions")}>Cancel</Button>
          <Button design="Emphasized" type="Submit" disabled={loading}>
            {loading ? <BusyIndicator active size="S" /> : "Create Proposition"}
          </Button>
        </FlexBox>
      </form>
    </div>
  );
};

export default CreateProposition;
