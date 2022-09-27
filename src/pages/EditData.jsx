import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { API } from "../config/api";
import { useParams, useNavigate } from "react-router";
import { useMutation } from "react-query";
import { useEffect } from "react";

export default function EditData() {
  document.title = "Edit Data";

  const navigate = useNavigate();
  const { id } = useParams();

  const [vehicleData, setVehicleData] = useState({});
  const [form, setForm] = useState({
    id: id,
    registration_number: "",
    owner: "",
    vehicle_brand: "",
    owner_address: "",
    production_year: "",
    cilinder_capacity: "",
    vehicle_color: "",
    fuel: "",
  });

  let getData = async () => {
    const response = await API.get("/vehicle-data/" + id);
    setVehicleData(response.data);
    setForm({
      ...form,
      registration_number: response.data.registration_number,
      owner: response.data.owner,
      vehicle_brand: response.data.vehicle_brand,
      production_year: response.data.production_year,
      owner_address: response.data.owner_address,
      cilinder_capacity: response.data.cilinder_capacity,
      vehicle_color: response.data.vehicle_color,
      fuel: response.data.fuel,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await API.patch("/vehicle-data/", form, config);
     
    } catch (error) {
      console.log(error);
    }
    alert("Data Berhasil Di-update");
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
            <h4>Edit Data Kendaraan</h4>
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
            value={form.registration_number}
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
            value={form.owner}
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
            value={form.vehicle_brand}
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
              value={form.owner_address}
            />
          </FloatingLabel>
          <div className="d-flex justify-content-start mt-5">
            <Button
              type="submit"
              className="btn-sm btn-primary"
              style={{ height: "2rem", width: "8rem", marginRight: "1rem" }}
            >
              Ubah
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
            type="number"
            name="production_year"
            id="production_year"
            style={{ height: "2rem", width: "100%" }}
            maxLength="4"
            onChange={handleChange}
            value={form.production_year}
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
            value={form.cilinder_capacity}
          />
          <Form.Label htmlFor="vehicle_color" style={{ fontWeight: "bold" }}>
            Warna Kendaraan
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
            name="vehicle_color"
          >
            <option value="">{form.vehicle_color}</option>
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
            value={form.fuel}
          />
        </div>
      </div>
    </Form>
  );
}
