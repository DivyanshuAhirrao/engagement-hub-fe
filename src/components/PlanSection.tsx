import React from "react";
import {
  Title,
  Button,
  Input,
  FlexBox,
  Label,
  MessageStrip,
} from "@ui5/webcomponents-react";
import { PlanRequest } from "../types/types";
import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/delete";

interface PlanSectionProps {
  plans: PlanRequest[];
  onPlansChange: (plans: PlanRequest[]) => void;
  errors?: Record<number, { name?: string; basePremium?: string }>;
}

const PlanSection: React.FC<PlanSectionProps> = ({
  plans,
  onPlansChange,
  errors = {},
}) => {
  const addPlan = () => {
    onPlansChange([...plans, { name: "", basePremium: 0 }]);
  };

  const removePlan = (index: number) => {
    onPlansChange(plans.filter((_, i) => i !== index));
  };

  const updatePlan = (index: number, field: keyof PlanRequest, value: any) => {
    const updated = [...plans];
    updated[index] = { ...updated[index], [field]: value };
    onPlansChange(updated);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <FlexBox
        justifyContent="SpaceBetween"
        alignItems="Center"
        style={{ marginBottom: "1rem" }}
      >
        <Title level="H4">Plans</Title>
        <Button icon="add" onClick={addPlan}>
          Add Plan
        </Button>
      </FlexBox>

      {plans.length === 0 && (
        <MessageStrip design="Information">
          No plans added yet. Click "Add Plan" to create one.
        </MessageStrip>
      )}

      {plans.map((plan, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <FlexBox
            justifyContent="SpaceBetween"
            alignItems="Start"
            style={{ gap: "1rem" }}
          >
            <div style={{ flex: 1 }}>
              <Label required>Plan Name</Label>
              <Input
                value={plan.name}
                onInput={(e: any) => updatePlan(index, "name", e.target.value)}
                style={{ width: "100%" }}
                valueState={errors[index]?.name ? "Negative" : "None"}
                // valueStateMessage={errors[index]?.name || undefined}
              />
            </div>

            <div style={{ flex: 1 }}>
              <Label required>Base Premium ($)</Label>
              <Input
                type="Number"
                value={plan.basePremium.toString()}
                onInput={(e: any) =>
                  updatePlan(
                    index,
                    "basePremium",
                    parseFloat(e.target.value) || 0,
                  )
                }
                style={{ width: "100%" }}
                valueState={errors[index]?.basePremium ? "Negative" : "None"}
                // valueStateMessage={errors[index]?.basePremium}
              />
            </div>

            <Button
              icon="delete"
              design="Transparent"
              onClick={() => removePlan(index)}
              style={{ marginTop: "1.5rem" }}
            />
          </FlexBox>
        </div>
      ))}
    </div>
  );
};

export default PlanSection;
