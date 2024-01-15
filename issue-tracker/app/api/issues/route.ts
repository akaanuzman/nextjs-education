import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is cannot be null!').max(255),
    description: z.string().min(1, 'Description is cannot be null!').max(511),
});

/// POST: /api/issues
/// Creates a new issue
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    /// If the validation fails, return a 400 with the errors
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

    /// Else create the issue and return it
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    });

    return NextResponse.json(newIssue, { status: 201 });
}