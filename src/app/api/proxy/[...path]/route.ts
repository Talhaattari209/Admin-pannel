import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.fennecapp.io';
const BASE = API_BASE.replace(/\/$/, '');

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return proxy(request, await params);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return proxy(request, await params);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return proxy(request, await params);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return proxy(request, await params);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return proxy(request, await params);
}

async function proxy(request: NextRequest, { path }: { path: string[] }) {
    const pathname = path?.length ? path.join('/') : '';
    const url = new URL(request.url);
    const search = url.searchParams.toString();
    const targetUrl = `${BASE}/${pathname}${search ? `?${search}` : ''}`;
    console.log(`[Proxy] ${request.method} ${request.url} -> ${targetUrl}`);

    const headers = new Headers();
    const headersLog: Record<string, string> = {};
    request.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'host') return;
        headers.set(key, value);
        if (key.toLowerCase() === 'authorization') {
            headersLog[key] = value.length > 20 ? `${value.substring(0, 15)}...` : value;
        } else {
            headersLog[key] = value;
        }
    });
    console.log('[Proxy] Forwarding headers:', JSON.stringify(headersLog));

    const init: RequestInit = {
        method: request.method,
        headers,
    };
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        try {
            const body = await request.text();
            if (body) {
                init.body = body;
                if (!headers.has('Content-Type')) {
                    headers.set('Content-Type', 'application/json');
                }
            }
        } catch {
            // no body
        }
    }

    try {
        const res = await fetch(targetUrl, init);
        const data = await res.text();
        const response = new NextResponse(data, {
            status: res.status,
            statusText: res.statusText,
        });
        res.headers.forEach((value, key) => {
            if (key.toLowerCase() === 'transfer-encoding') return;
            response.headers.set(key, value);
        });
        return response;
    } catch (err) {
        console.error('[Proxy]', err);
        return NextResponse.json({ detail: 'Proxy request failed' }, { status: 502 });
    }
}
