import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";

const Address = () => {
  const [addresses, setAddresses] = useState([]);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    type: "Home",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ===============================
  // LOAD ADDRESSES
  // ===============================
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.log("User ID not found");
      return;
    }

    fetch(`http://localhost:5000/api/addresses/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAddresses(data.addresses || []);
      })
      .catch((error) => {
        console.error("Error loading addresses:", error);
      });
  }, []);

  // ===============================
  // INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // OPEN ADD
  // ===============================
  const handleOpenAdd = () => {
    setEditId(null);

    setForm({
      type: "Home",
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

    setOpen(true);
  };

  // ===============================
  // OPEN EDIT
  // ===============================
  const handleEdit = (item) => {
    setEditId(item._id);

    setForm({
      type: item.type,
      name: item.name,
      phone: item.phone,
      address: item.address,
      city: item.city,
      state: item.state,
      pincode: item.pincode,
    });

    setOpen(true);
  };

  // ===============================
  // SAVE / UPDATE ADDRESS
  // ===============================
  const handleSave = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      // ===============================
      // EDIT ADDRESS
      // ===============================
      if (editId) {
        const response = await fetch(
          `http://localhost:5000/api/addresses/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to update address");
          return;
        }

        setAddresses((prev) =>
          prev.map((item) =>
            item._id === editId ? data.address : item
          )
        );

        setOpen(false);

        alert("Address updated successfully!");
        return;
      }

      // ===============================
      // ADD NEW ADDRESS
      // ===============================
      const response = await fetch(
        "http://localhost:5000/api/addresses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            ...form,
            isDefault: addresses.length === 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to save address");
        return;
      }

      setAddresses((prev) => [...prev, data.address]);

      setOpen(false);

      setForm({
        type: "Home",
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });

      alert("Address saved successfully!");
    } catch (error) {
      console.error("Address error:", error);
      alert(`Unable to connect to server: ${error.message}`);
    }
  };

  // ===============================
  // DELETE ADDRESS
  // ===============================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/addresses/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete address");
        return;
      }

      setAddresses((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Address deleted successfully!");
    } catch (error) {
      console.error("Delete address error:", error);
      alert("Unable to connect to server");
    }
  };

  // ===============================
  // SET DEFAULT
  // ===============================
  const handleDefault = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/addresses/${id}/default`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to set default address");
        return;
      }

      setAddresses((prev) =>
        prev.map((item) => ({
          ...item,
          isDefault: item._id === id,
        }))
      );

      alert("Default address updated!");
    } catch (error) {
      console.error("Default address error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              mb: 0.5,
            }}
          >
            My Addresses
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage your delivery addresses
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add New Address
        </Button>
      </Box>

      {/* Address Cards */}
      {addresses.length === 0 ? (
        <Card
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <LocationOnIcon
            sx={{
              fontSize: 60,
              color: "primary.main",
              mb: 1,
            }}
          />

          <Typography variant="h6" fontWeight={600}>
            No addresses found
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Add an address to make your food delivery easier.
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAdd}
          >
            Add Address
          </Button>
        </Card>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
            },
            gap: 3,
          }}
        >
          {addresses.map((item) => (
            <Card
              key={item._id}
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
                border: item.isDefault
                  ? "2px solid #1976d2"
                  : "1px solid #e2e8f0",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Card Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {item.type === "Work" ? (
                      <WorkIcon color="primary" />
                    ) : (
                      <HomeIcon color="primary" />
                    )}

                    <Typography variant="h6" fontWeight={700}>
                      {item.type}
                    </Typography>
                  </Box>

                  {item.isDefault && (
                    <Chip
                      label="Default"
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  )}
                </Box>

                <Typography fontWeight={600} sx={{ mb: 0.5 }}>
                  {item.name}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {item.phone}
                </Typography>

                <Typography color="text.secondary">
                  {item.address}
                </Typography>

                <Typography color="text.secondary">
                  {item.city}, {item.state}
                </Typography>

                <Typography color="text.secondary">
                  PIN: {item.pincode}
                </Typography>

                {/* Actions */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                    pt: 2,
                    borderTop: "1px solid #e2e8f0",
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={item.isDefault}
                    onClick={() => handleDefault(item._id)}
                    sx={{ textTransform: "none" }}
                  >
                    {item.isDefault
                      ? "Default Address"
                      : "Set as Default"}
                  </Button>

                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(item)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(item._id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Add / Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editId ? "Edit Address" : "Add New Address"}
        </DialogTitle>

        <DialogContent>
          <RadioGroup
            row
            name="type"
            value={form.type}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value="Home"
              control={<Radio />}
              label="Home"
            />

            <FormControlLabel
              value="Work"
              control={<Radio />}
              label="Work"
            />
          </RadioGroup>

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />

          <TextField
            fullWidth
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            margin="normal"
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              textTransform: "none",
              px: 3,
            }}
          >
            {editId ? "Update Address" : "Save Address"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Address;