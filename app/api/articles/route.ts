import { NextResponse } from 'next/server';
import pool from '@/config/database';

// Handle GET request to fetch all articles
export async function GET() {
  try {
    const [articles] = await pool.query('SELECT * FROM articles');
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Error fetching articles' }, { status: 500 });
  }
}

// Handle POST request to create a new article with tags
export async function POST(request: Request) {
  try {
    const { title, content, author, category, imageUrl, tags } = await request.json();
    
    // Insert the article along with the tags
    const [result] = await pool.query(
      'INSERT INTO articles (title, content, author, category, imageUrl, tags) VALUES (?, ?, ?, ?, ?, ?)',
      [title, content, author, category, imageUrl, tags.join(',')]  // Join tags as a comma-separated string
    );
    
    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Error creating article' }, { status: 500 });
  }
}
