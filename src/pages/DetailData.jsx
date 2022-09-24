import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button } from "react-bootstrap";
import { API } from "../config/api";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "react-query";

export default function DetailData() {
  document.title = "Detail Data";

  const navigate = useNavigate();
  const { id } = useParams();

  let { data: vehicleData } = useQuery("vehicleDataChache", async () => {
    const response = await API.get("/vehicle-data/" + id);
    return response.data;
  });

  return (
    <>
      <div style={{ padding: "5rem", display: "flex", flexWrap: "wrap" }}>
        <div style={{ marginRight: "5rem" }}>
          <div
            className="text-header-category mb-4"
            style={{ vehicle_color: `black` }}
          >
            <h4>Detail Data Kendaraan</h4>
          </div>
          <Form.Label
            htmlFor="registration_number"
            style={{ fontWeight: "bold" }}
          >
            No Registrasi Kendaraan
          </Form.Label>
          <Form.Control
            type="text"
            style={{ height: "2rem", width: "100%" }}
            value={vehicleData?.registration_number}
            disabled
          />
          <Form.Label htmlFor="owner" style={{ fontWeight: "bold" }}>
            Nama Pemilik
          </Form.Label>
          <Form.Control
            style={{ height: "2rem", width: "100%" }}
            type="text"
            value={vehicleData?.owner}
            disabled
          />
          <Form.Label htmlFor="vehicle_brand" style={{ fontWeight: "bold" }}>
            Merk Kendaraan
          </Form.Label>
          <Form.Control
            type="text"
            style={{ height: "2rem", width: "100%" }}
            value={vehicleData?.vehicle_brand}
            disabled
          />
          <Form.Label htmlFor="owner_address" style={{ fontWeight: "bold" }}>
            Alamat Pemilik Kendaraan
          </Form.Label>
          <FloatingLabel controlId="floatingTextarea2" label="">
            <Form.Control
              as="textarea"
              style={{ height: "100px", width: "100%", resize: "none" }}
              value={vehicleData?.owner_address}
              disabled
            />
          </FloatingLabel>
          <Button
            className="btn-sm btn-secondary"
            style={{ height: "2rem", width: "8rem", marginTop: "1rem" }}
            onClick={() => navigate("/")}
          >
            Kembali
          </Button>
        </div>
        <div style={{ paddingTop: "3.2rem" }}>
          <Form.Label htmlFor="production_year" style={{ fontWeight: "bold" }}>
            Tahun Pembuatan
          </Form.Label>
          <Form.Control
            type="number"
            style={{ height: "2rem", width: "100%" }}
            maxLength="4"
            value={vehicleData?.production_year}
            disabled
          />
          <Form.Label
            htmlFor="cilinder_capacity"
            style={{ fontWeight: "bold" }}
          >
            Kapasitas Silinder
          </Form.Label>
          <Form.Control
            style={{ height: "2rem", width: "100%" }}
            type="numeric"
            value={vehicleData?.cilinder_capacity}
            disabled
          />
          <Form.Label htmlFor="vehicle_color" style={{ fontWeight: "bold" }}>
            Warna Kendaraan
          </Form.Label>
          <Form.Select name="vehicle_color" disabled>
            <option value="">{vehicleData?.vehicle_color}</option>
          </Form.Select>
          <Form.Label htmlFor="fuel" style={{ fontWeight: "bold" }}>
            Bahan Bakar
          </Form.Label>
          <Form.Control
            style={{ height: "2rem", width: "100%" }}
            type="text"
            value={vehicleData?.fuel}
            disabled
          />
        </div>
      </div>
    </>
  );
}
