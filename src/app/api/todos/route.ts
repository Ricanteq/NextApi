import { NextResponse } from 'next/server';

const API_BASE_URL = 'http://localhost:5036/swagger/index.html'; // Replace with your backend API base URL

// Assuming the endpoints for CRUD operations are as follows:
const USERS_ENDPOINT = `${API_BASE_URL}/users`;

export async function GET() {
  try {
    const response = await fetch(USERS_ENDPOINT);
    const users = await response.json();
    return NextResponse.json(users);
  } catch (error) {
    console.error('An error occurred while fetching users:', error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: 'Missing required data' });
    }

    const response = await fetch(USERS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const newUser = await response.json();
    return NextResponse.json(newUser);
  } catch (error) {
    console.error('An error occurred while creating a user:', error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request) {
  try {
    const { id, firstName, lastName, email, password } = await request.json();

    if (!id || !firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: 'Missing required data' });
    }

    const response = await fetch(`${USERS_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const updatedUser = await response.json();
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('An error occurred while updating a user:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ message: 'User id required' });
    }

    await fetch(`${USERS_ENDPOINT}/${id}`, {
      method: 'DELETE',
    });

    return NextResponse.json({ message: `User ${id} deleted` });
  } catch (error) {
    console.error('An error occurred while deleting a user:', error);
    return NextResponse.error();
  }
}
