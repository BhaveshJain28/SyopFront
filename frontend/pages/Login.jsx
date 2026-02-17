import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Badge, Alert, InputGroup } from "react-bootstrap";
import { UseAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function Login() {
  const { login, backendUrl } = UseAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    // Simulate login process
    try {
      // Handle successful login here
      const response = await axios.post(`${backendUrl}/api/user/login`, formData);
      login(response.data.user, response.data.token);
      navigate('/dashboard');

    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
    
  };
  const features = [
    {
      icon: "fas fa-brain",
      title: "AI-Powered Insights",
      description: "Get personalized health insights powered by advanced machine learning"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security"
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile Ready",
      description: "Access your health journal anywhere with our mobile apps"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      condition: "Lupus",
      quote: "SymptomAI helped me identify patterns I never noticed before. It's been life-changing.",
      rating: 5
    },
    {
      name: "Michael R.",
      condition: "Rheumatoid Arthritis",
      quote: "The AI insights have improved my discussions with my doctor significantly.",
      rating: 5
    }
  ];

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
      <Container fluid>
        <Row className="min-vh-100">
          {/* Left Side - Login Form */}
          <Col lg={6} className="d-flex align-items-center justify-content-center p-5">
            <div style={{ maxWidth: '450px', width: '100%' }}>
              {/* Back to Home Link */}
              <Link to="/" className="text-decoration-none text-muted mb-4 d-inline-flex align-items-center">
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </Link>

              {/* Logo & Brand */}
              <div className="text-center mb-5">
                <div className="gradient-primary rounded-3 d-inline-flex p-3 mb-3">
                  <i className="fas fa-brain text-white" style={{ fontSize: '2rem' }}></i>
                </div>
                <h2 className="fw-bold text-gradient-primary">Welcome Back</h2>
                <p className="text-muted">Sign in to your SymptomAI account to continue tracking your health</p>
              </div>

              {/* Login Form */}
              <Card className="medical-card border-0 shadow">
                <Card.Body className="p-4">
                  {loginError && (
                    <Alert variant="danger" className="mb-4">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {loginError}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="fas fa-envelope text-muted"></i>
                        </InputGroup.Text>
                        <Form.Control
                          className="white-placeholder"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="fas fa-lock text-muted"></i>
                        </InputGroup.Text>
                        <Form.Control
                          className="white-placeholder"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                          required
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        label="Remember me"
                        id="remember-me"
                      />
                      <Link to="/forgot-password" className="text-primary text-decoration-none">
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="btn-medical-primary w-100 py-3 mb-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Signing In...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Sign In
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <span className="text-muted">Don't have an account? </span>
                      <Link to="/register" className="text-primary text-decoration-none fw-semibold">
                        Create Account
                      </Link>
                    </div>
                  </Form>

                  {/* Social Login Options */}
                  <div className="mt-4">
                    <div className="text-center mb-3">
                      <span className="text-muted">Or continue with</span>
                    </div>
                    <div className="d-grid gap-2">
                      <Button variant="outline-primary" size="sm">
                        <i className="fab fa-google me-2"></i>
                        Continue with Google
                      </Button>
                      <Button variant="outline-dark" size="sm">
                        <i className="fab fa-apple me-2"></i>
                        Continue with Apple
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Security Notice */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  <i className="fas fa-shield-alt me-1"></i>
                  Your data is protected with 256-bit SSL encryption
                </small>
              </div>
            </div>
          </Col>

          {/* Right Side - Features & Testimonials */}
          <Col lg={6} className="bg-primary text-white d-none d-lg-flex flex-column justify-content-center position-relative">
            <div className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                backgroundImage: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 1000\'><polygon fill=\'%23ffffff\' fill-opacity=\'0.05\' points=\'0,1000 1000,0 1000,1000\'/></svg>")'
              }}>
            </div>

            <Container className="position-relative">
              <div className="text-center mb-5">
                <Badge bg="warning" className="mb-3 px-3 py-2">
                  <i className="fas fa-award me-2"></i>
                  Trusted by 10,000+ Patients
                </Badge>
                <h1 className="display-4 fw-bold mb-4">
                  Take Control of Your
                  <span className="d-block text-warning">Health Journey</span>
                </h1>
                <p className="lead opacity-90">
                  Join thousands of patients who are managing their rare conditions
                  with AI-powered insights and personalized tracking.
                </p>
              </div>

              {/* Features */}
              <Row className="g-4 mb-5">
                {features.map((feature, index) => (
                  <Col md={12} key={index}>
                    <div className="d-flex align-items-start">
                      <div className="bg-warning rounded-3 p-3 me-3 flex-shrink-0">
                        <i className={`${feature.icon} text-primary`} style={{ fontSize: '1.2rem' }}></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-2">{feature.title}</h5>
                        <p className="opacity-90 mb-0">{feature.description}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>

              {/* Testimonials */}
              <div>
                <h4 className="fw-bold mb-4 text-center">What Our Patients Say</h4>
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="bg-white bg-opacity-10 border-0 mb-3 text-white">
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{ width: '50px', height: '50px' }}>
                          <i className="fas fa-user text-primary"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                          <small className="opacity-75">{testimonial.condition}</small>
                        </div>
                        <div className="ms-auto">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <i key={i} className="fas fa-star text-warning"></i>
                          ))}
                        </div>
                      </div>
                      <p className="mb-0 opacity-90 fst-italic">"{testimonial.quote}"</p>
                    </Card.Body>
                  </Card>
                ))}
              </div>

              {/* Stats */}
              <Row className="text-center mt-5">
                <Col xs={4}>
                  <div className="bg-white bg-opacity-10 rounded-3 p-3">
                    <h3 className="fw-bold text-warning mb-1">10K+</h3>
                    <small className="opacity-75">Active Users</small>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="bg-white bg-opacity-10 rounded-3 p-3">
                    <h3 className="fw-bold text-warning mb-1">95%</h3>
                    <small className="opacity-75">Accuracy Rate</small>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="bg-white bg-opacity-10 rounded-3 p-3">
                    <h3 className="fw-bold text-warning mb-1">500+</h3>
                    <small className="opacity-75">Conditions</small>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
