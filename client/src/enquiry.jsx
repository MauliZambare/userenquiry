import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './enquiry.css'; // Custom styles if needed

export default function Enquiry() {


  const saveEnquiry = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target); // ✅ Use FormData to read input values safely

  let Form = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message')
  };

  console.log("Form to send:", Form); // ✅ See if data is really sent

  axios.post('http://localhost:8000/api/website/enquiry/insert', Form)
    .then((res) => {
      console.log("Response:", res.data);
      toast.success('Enquiry Saved Successfully');
      e.target.reset(); // ✅ Optional: clear form after success
    })
    .catch((err) => {
      console.error("Error while saving:", err);
      toast.error('Failed to save enquiry');
    });
};


  return (
    <>
      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container-fluid py-4 bg-white min-vh-100">
        <h1 className="text-center mb-4 fw-bold">User Enquiry</h1>

        <div className="row">
          {/* Left: Enquiry Form */}
          <div className="col-md-4 px-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title fw-bold mb-3">Enquiry Form</h4>
                <form onSubmit={saveEnquiry}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" placeholder="Enter your phone" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" name="message" placeholder="Enter your message" rows="3" required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
              </div>
            </div>
          </div>

          {/* Right: Enquiry List */}
          <div className="col-md-8 px-4">
            <h4 className="fw-bold mb-3">Enquiry List</h4>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mauli Zambare</td>
                    <td>mauli@example.com</td>
                    <td>9876543210</td>
                    <td>Need more info</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-secondary">Update</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                  {/* Add more rows dynamically here */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
