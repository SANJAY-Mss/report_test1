import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        // Validate file type
        const validTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only PDF and DOCX are allowed." },
                { status: 400 }
            );
        }

        // Validate size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File size exceeds 10MB limit." },
                { status: 400 }
            );
        }

        // In a real production environment, upload to S3/Blob storage
        // For this implementation, we'll mock the upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to temp directory (optional, for local testing)
        // const path = join(cwd(), "tmp", file.name);
        // await writeFile(path, buffer);

        return NextResponse.json({
            success: true,
            fileId: `file_${Date.now()}`,
            filename: file.name,
            message: "File uploaded successfully"
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Internal server error during upload" },
            { status: 500 }
        );
    }
}
