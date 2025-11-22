// API client for backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
}

interface RegistrationData {
  name: string;
  email: string;
  mobile: string;
  department?: string;
  company: string;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  payment_status?: string;
}

interface RazorpayOrderData {
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
}

/**
 * Save registration to MongoDB
 */
export async function saveRegistration(data: RegistrationData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/registration/save-registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to save registration');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Create Razorpay order
 */
export async function createRazorpayOrder(data: RegistrationData): Promise<RazorpayOrderData> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/razorpay/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create order');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Check API health
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const result = await response.json();
    return result.status === 'OK';
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}

