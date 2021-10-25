/// <reference types="react-scripts" />

interface Contact {
  _id: string;
  fullname: string;
  phone: string;
  description?: string;
}

interface AddingError {
  error: boolean;
  message: string;
}
