import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { API } from "../config/api";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";

export default function AddData() {
  document.title = "Add Data";

  const navigate = useNavigate();
  const [form, setForm] = useState({
    registration_number: "",
    owner: "",
    vehicle_brand: "",
    owner_address: "",
    production_year: "",
    cilinder_capacity: "",
    vehicle_color: "",
    fuel: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/vehicle-data", form);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    alert("Data Berhasil Ditambahkan");
    navigate("/");
  });

  return (
    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
      <div style={{ padding: "5rem", display: "flex", flexWrap: "wrap" }}>
        <div style={{ marginRight: "5rem" }}>
          <div
            className="text-header-category mb-4"
            style={{ vehicle_color: `black` }}
          >
            <h4>Tambah Data Kendaraan</h4>
          </div>
          <Form.Label
            htmlFor="registration_number"
            style={{ fontWeight: "bold" }}
          >
            No Registrasi Kendaraan
          </Form.Label>
          <Form.Control
            type="text"
            name="registration_number"
            id="registration_number"
            style={{ height: "2rem", width: "100%" }}
            onChange={handleChange}
            required
          />
          <Form.Label htmlFor="owner" style={{ fontWeight: "bold" }}>
            Nama Pemilik
          </Form.Label>
          <Form.Control
            style={{ height: "2rem", width: "100%" }}
            type="text"
            name="owner"
            id="owner"
            onChange={handleChange}
            required
          />
          <Form.Label htmlFor="vehicle_brand" style={{ fontWeight: "bold" }}>
            Merk Kendaraan
          </Form.Label>
          <Form.Control
            type="text"
            name="vehicle_brand"
            id="vehicle_brand"
            style={{ marginBottom: "1rem", height: "2rem", width: "100%" }}
            onChange={handleChange}
          />
          <Form.Label htmlFor="owner_address" style={{ fontWeight: "bold" }}>
            Alamat Pemilik Kendaraan
          </Form.Label>
          <FloatingLabel controlId="floatingTextarea2" label="">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px", width: "100%", resize: "none" }}
              onChange={handleChange}
              name="owner_address"
            />
          </FloatingLabel>
          <div className="d-flex justify-content-start mt-5">
            <Button
              type="submit"
              className="btn-sm btn-primary"
              style={{ height: "2rem", width: "8rem", marginRight: "1rem" }}
            >
              Simpan
            </Button>
            <Button
              className="btn-sm btn-secondary"
              style={{ height: "2rem", width: "8rem" }}
              onClick={() => navigate("/")}
            >
              Kembali
            </Button>
          </div>
        </div>
        <div style={{ paddingTop: "3.2rem" }}>
          <Form.Label htmlFor="production_year" style={{ fontWeight: "bold" }}>
            Tahun Pembuatan
          </Form.Label>
          <Form.Control
            type="numeric"
            name="production_year"
            id="production_year"
            style={{ height: "2rem", width: "100%" }}
            maxLength="4"
            onChange={handleChange}
          />
          <Form.Label
            htmlFor="cilinder_capacity"
            style={{ fontWeight: "bold" }}
          >
            Kapasitas Silinder
          </Form.Label>
          <Form.Control
            style={{ height: "2rem", width: "100%", marginBottom: "1rem" }}
            type="numeric"
            id="cilinder_capacity"
            name="cilinder_capacity"
            onChange={handleChange}
          />
          <Form.Label
            htmlFor="vehicle_color"
            style={{ fontWeight: "bold" }}
            name="vehicle_color"
          >
            Warna Kendaraan
          </Form.Label>
          <Form.Select
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
            name="vehicle_color"
          >
            <option value="">Pilih warna</option>
            <option value="Merah">Merah</option>
            <option value="Hitam">Hitam</option>
            <option value="Biru">Biru</option>
            <option value="Abu-abu">Abu-abu</option>
          </Form.Select>
          <Form.Label htmlFor="fuel" style={{ fontWeight: "bold" }}>
            Bahan Bakar
          </Form.Label>
          <Form.Control
            style={{ height: "2rem", width: "100%" }}
            type="text"
            id="fuel"
            name="fuel"
            onChange={handleChange}
          />
        </div>
      </div>
    </Form>
  );
}
