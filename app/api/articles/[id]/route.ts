import { NextResponse } from 'next/server';
import pool from '@/config/database';

// Handle GET request to fetch a single article by its ID, including tags
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const [article] = await pool.query('SELECT * FROM articles WHERE id = ?', [params.id]);
    if (article.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article[0]);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Error fetching article' }, { status: 500 });
  }
}
