import { NextResponse, type NextRequest } from 'next/server'
import { getHistoricalKnowledge } from '@/utils/supabase/wikiService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    if (!query || !query.trim()) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
    }

    const knowledge = await getHistoricalKnowledge(query)

    if (!knowledge) {
      return NextResponse.json({
        found: false,
        message: `No Wikipedia historical context found for "${query}"`
      }, { status: 404 })
    }

    return NextResponse.json({
      found: true,
      data: knowledge
    })
  } catch (err: any) {
    return NextResponse.json({
      found: false,
      error: err.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
