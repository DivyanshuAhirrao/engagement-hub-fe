import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Button,
  FlexBox,
  BusyIndicator,
  IllustratedMessage,
  Tag,
  Select,
  Option,
  Input,
  Card,
  Label,
  MessageStrip,
} from "@ui5/webcomponents-react";
import { AnalyticalTable } from "@ui5/webcomponents-react";
import { Proposition, LineOfBusiness, PropositionStatus } from "../types/types";
import { formatCurrency, formatDateTime } from "@utils/formatters";
import ConfirmDialog from "@components/ConfirmDialog";
import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/edit";
import "@ui5/webcomponents-icons/dist/delete";
import "@ui5/webcomponents-icons/dist/display";
import "@ui5/webcomponents-icons/dist/filter";
import "@ui5/webcomponents-icons/dist/refresh";
import { GetPropositionsParams, propositionsApi } from "mockData";

const PropositionsList: React.FC = () => {
  const navigate = useNavigate();
  const [propositions, setPropositions] = useState<Proposition[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);

  // Filters
  const [nameFilter, setNameFilter] = useState("");
  const [lobFilter, setLobFilter] = useState<LineOfBusiness | undefined>();
  const [statusFilter, setStatusFilter] = useState<
    PropositionStatus | undefined
  >();
  const [showFilters, setShowFilters] = useState(false);

  // Delete confirmation
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id: number | null;
    name: string;
  }>({
    open: false,
    id: null,
    name: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchPropositions = useCallback(async () => {
    try {
      setLoading(true);
      const params: GetPropositionsParams = {
        page: pageNumber,
        size: pageSize,
        name: nameFilter || undefined,
        lineOfBusiness: lobFilter,
        status: statusFilter,
      };
      const response = await propositionsApi.getAll(params);
      setPropositions(response.content);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error("Failed to fetch propositions:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, nameFilter, lobFilter, statusFilter]);

  useEffect(() => {
    fetchPropositions();
  }, [fetchPropositions]);

  const handleDelete = async () => {
    if (deleteDialog.id) {
      try {
        await propositionsApi.delete(deleteDialog.id);
        setDeleteDialog({ open: false, id: null, name: "" });
        setSuccessMessage(`"${deleteDialog.name}" deleted successfully!`);
        setTimeout(() => setSuccessMessage(null), 3000);
        fetchPropositions();
      } catch (error) {
        console.error("Failed to delete proposition:", error);
      }
    }
  };

  const handleClearFilters = () => {
    setNameFilter("");
    setLobFilter(undefined);
    setStatusFilter(undefined);
    setPageNumber(0);
  };

  const getStatusColor = (status: PropositionStatus): string => {
    switch (status) {
      case PropositionStatus.ACTIVE:
        return "8";
      case PropositionStatus.INACTIVE:
        return "1";
      case PropositionStatus.DRAFT:
        return "2";
      default:
        return "7";
    }
  };

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      width: 80,
    },
    {
      Header: "Name",
      accessor: "name",
      width: 250,
      Cell: ({ cell }: any) => (
        <div style={{ fontWeight: 500, color: "#0a6ed1" }}>{cell.value}</div>
      ),
    },
    {
      Header: "Line of Business",
      accessor: "lineOfBusiness",
      width: 150,
      Cell: ({ cell }: any) => (
        <Tag colorScheme="6" style={{ fontWeight: 500 }}>
          {cell.value}
        </Tag>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      width: 120,
      Cell: ({ cell }: any) => (
        <Tag colorScheme={getStatusColor(cell.value)}>{cell.value}</Tag>
      ),
    },
    {
      Header: "Plans",
      accessor: "planCount",
      width: 100,
      Cell: ({ cell }: any) => (
        <div style={{ textAlign: "center", fontWeight: 600 }}>{cell.value}</div>
      ),
    },
    {
      Header: "Min Premium",
      accessor: "minimumPremium",
      width: 130,
      Cell: ({ cell }: any) => (
        <div style={{ fontWeight: 600, color: "#2ca02c" }}>
          {formatCurrency(cell.value)}
        </div>
      ),
    },
    {
      Header: "Created",
      accessor: "createdAt",
      width: 180,
      Cell: ({ cell }: any) => (
        <div style={{ fontSize: "0.875rem", color: "#666" }}>
          {formatDateTime(cell.value)}
        </div>
      ),
    },
    {
      Header: "Actions",
      width: 180,
      Cell: ({ row }: any) => (
        <FlexBox style={{ gap: "0.5rem" }}>
          <Button
            icon="display"
            design="Transparent"
            tooltip="View Details"
            onClick={() => navigate(`/propositions/${row.original.id}`)}
          />
          <Button
            icon="edit"
            design="Transparent"
            tooltip="Edit"
            onClick={() => navigate(`/propositions/${row.original.id}/edit`)}
          />
          <Button
            icon="delete"
            design="Transparent"
            tooltip="Delete"
            onClick={() =>
              setDeleteDialog({
                open: true,
                id: row.original.id,
                name: row.original.name,
              })
            }
          />
        </FlexBox>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <FlexBox
        justifyContent="SpaceBetween"
        alignItems="Center"
        style={{ marginBottom: "1.5rem" }}
      >
        <div>
          <Title level="H2" style={{ margin: 0, color: "#0a6ed1" }}>
            📚 Propositions Library
          </Title>
          <p style={{ margin: "0.5rem 0 0 0", color: "#6a6a6a" }}>
            {totalElements} proposition{totalElements !== 1 ? "s" : ""} found
          </p>
        </div>
        <FlexBox style={{ gap: "0.75rem" }}>
          <Button
            icon="refresh"
            onClick={fetchPropositions}
            tooltip="Refresh"
          />
          <Button
            icon="filter"
            onClick={() => setShowFilters(!showFilters)}
            design={showFilters ? "Emphasized" : "Default"}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button
            icon="add"
            design="Emphasized"
            onClick={() => navigate("/propositions/new")}
          >
            Create Proposition
          </Button>
        </FlexBox>
      </FlexBox>

      {/* Success Message */}
      {successMessage && (
        <MessageStrip design="Positive" style={{ marginBottom: "1rem" }}>
          {successMessage}
        </MessageStrip>
      )}

      {/* Filters Card */}
      {showFilters && (
        <Card
          style={{
            marginBottom: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "12px",
          }}
        >
          <div style={{ padding: "1.5rem" }}>
            <FlexBox style={{ gap: "1rem", flexWrap: "wrap" }} alignItems="End">
              <div style={{ flex: "1 1 250px" }}>
                <Label>Search by Name</Label>
                <Input
                  placeholder="Search propositions..."
                  value={nameFilter}
                  onInput={(e: any) => {
                    setNameFilter(e.target.value);
                    setPageNumber(0);
                  }}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ flex: "1 1 200px" }}>
                <Label>Line of Business</Label>
                <Select
                  onChange={(e: any) => {
                    const value = e.detail.selectedOption.value;
                    setLobFilter(value || undefined);
                    setPageNumber(0);
                  }}
                  style={{ width: "100%" }}
                >
                  <Option value="">All Lines</Option>
                  {Object.values(LineOfBusiness).map((lob) => (
                    <Option key={lob} value={lob} selected={lob === lobFilter}>
                      {lob}
                    </Option>
                  ))}
                </Select>
              </div>
              <div style={{ flex: "1 1 200px" }}>
                <Label>Status</Label>
                <Select
                  onChange={(e: any) => {
                    const value = e.detail.selectedOption.value;
                    setStatusFilter(value || undefined);
                    setPageNumber(0);
                  }}
                  style={{ width: "100%" }}
                >
                  <Option value="">All Statuses</Option>
                  {Object.values(PropositionStatus).map((status) => (
                    <Option
                      key={status}
                      value={status}
                      selected={status === statusFilter}
                    >
                      {status}
                    </Option>
                  ))}
                </Select>
              </div>
              <Button onClick={handleClearFilters}>Clear All</Button>
            </FlexBox>
          </div>
        </Card>
      )}

      {/* Table Card */}
      <Card
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "12px",
        }}
      >
        <div style={{ padding: "1.5rem" }}>
          {loading ? (
            <FlexBox justifyContent="Center" style={{ padding: "4rem" }}>
              <BusyIndicator active size="L" />
            </FlexBox>
          ) : propositions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem" }}>
              <IllustratedMessage name="NoData" />
              <p style={{ marginTop: "1rem", color: "#666" }}>
                No propositions found. Try adjusting your filters or create a
                new one.
              </p>
            </div>
          ) : (
            <AnalyticalTable
              columns={columns}
              data={propositions}
              filterable
              sortable
              visibleRows={pageSize}
              style={{ width: "100%" }}
            />
          )}
        </div>
      </Card>

      <ConfirmDialog
        open={deleteDialog.open}
        title="Delete Proposition"
        message={`Are you sure you want to delete "${deleteDialog.name}"? All associated plans will also be deleted. This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ open: false, id: null, name: "" })}
      />
    </div>
  );
};

export default PropositionsList;
