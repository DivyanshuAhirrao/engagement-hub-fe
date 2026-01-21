import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DynamicPage,
  DynamicPageTitle,
  DynamicPageHeader,
  ObjectStatus,
  Button,
  FlexBox,
  BusyIndicator,
  Label,
  Title,
  MessageStrip,
} from "@ui5/webcomponents-react";
import { AnalyticalTable } from "@ui5/webcomponents-react";
import { formatCurrency, formatDateTime } from "@utils/formatters";
import ConfirmDialog from "@components/ConfirmDialog";
import { PropositionDetail } from "../types/types";
import { propositionsApi } from "mockData";

const PropositionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [proposition, setProposition] = useState<PropositionDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProposition(parseInt(id));
    }
  }, [id]);

  const fetchProposition = async (propositionId: number) => {
    try {
      setLoading(true);
      const data = await propositionsApi.getById(propositionId);
      setProposition(data);
      setError(null);
    } catch (err) {
      setError("Failed to load proposition details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await propositionsApi.delete(parseInt(id));
        navigate("/propositions");
      } catch (error) {
        console.error("Failed to delete proposition:", error);
      }
    }
  };

  if (loading) {
    return (
      <FlexBox
        justifyContent="Center"
        alignItems="Center"
        style={{ height: "400px" }}
      >
        <BusyIndicator active />
      </FlexBox>
    );
  }

  if (error || !proposition) {
    return (
      <MessageStrip design="Negative">
        {error || "Proposition not found"}
      </MessageStrip>
    );
  }

  const planColumns = [
    {
      Header: "Plan ID",
      accessor: "id",
      width: 100,
    },
    {
      Header: "Plan Name",
      accessor: "name",
      width: 300,
    },
    {
      Header: "Base Premium",
      accessor: "basePremium",
      width: 150,
      Cell: ({ cell }: any) => formatCurrency(cell.value),
    },
  ];

  return (
    <>
      <DynamicPage
        titleArea={
          <DynamicPageTitle
            breadcrumbs={
              <Button
                design="Transparent"
                onClick={() => navigate("/propositions")}
              >
                ← Back to List
              </Button>
            }
            actionsBar={
              <>
                <Button
                  design="Emphasized"
                  onClick={() => navigate(`/propositions/${id}/edit`)}
                >
                  Edit
                </Button>
                <Button design="Negative" onClick={() => setDeleteDialog(true)}>
                  Delete
                </Button>
              </>
            }
          >
            {proposition.name}
            <ObjectStatus
              state={
                proposition.status === "ACTIVE" ? "Critical" : "Indication01"
              }
            >
              {proposition.status}
            </ObjectStatus>
          </DynamicPageTitle>
        }
      >
        <DynamicPageHeader>
          <FlexBox direction="Column" style={{ gap: "1rem" }}>
            <FlexBox style={{ gap: "2rem" }}>
              <div>
                <Label>Line of Business</Label>
                <div>{proposition.lineOfBusiness}</div>
              </div>
              <div>
                <Label>Created</Label>
                <div>{formatDateTime(proposition.createdAt)}</div>
              </div>
              <div>
                <Label>Last Updated</Label>
                <div>{formatDateTime(proposition.updatedAt)}</div>
              </div>
            </FlexBox>
            {proposition.description && (
              <div>
                <Label>Description</Label>
                <div>{proposition.description}</div>
              </div>
            )}
          </FlexBox>
        </DynamicPageHeader>
        <div style={{ padding: "2rem" }}>
          <Title level="H4" style={{ marginBottom: "1rem" }}>
            Plans ({proposition.plans.length})
          </Title>
          {proposition.plans.length > 0 ? (
            <AnalyticalTable columns={planColumns} data={proposition.plans} />
          ) : (
            <MessageStrip>
              No plans available for this proposition.
            </MessageStrip>
          )}
        </div>
      </DynamicPage>

      <ConfirmDialog
        open={deleteDialog}
        title="Delete Proposition"
        message="Are you sure you want to delete this proposition? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog(false)}
      />
    </>
  );
};

export default PropositionDetails;
