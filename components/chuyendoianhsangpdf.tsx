'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TaiLenTep } from './tai-len-tep'
import { TaiXuongPDF } from './tai-xuong-pdf'
import { Progress } from "@/components/ui/progress"
import { FileIcon, ImageIcon } from 'lucide-react'

export default function ChuyenDoiAnhSangPDF() {
  const [danhSachAnh, setDanhSachAnh] = useState<File[]>([])
  const [urlPDF, setUrlPDF] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)

  const xuLyTaiLenTep = (cacTep: File[]) => {
    setDanhSachAnh((anhTruocDo) => [...anhTruocDo, ...cacTep])
    setUrlPDF(null)
  }

  const xuLyChuyenDoi = async () => {
    setIsConverting(true)
    setProgress(0)

    // Mô phỏng quá trình chuyển đổi
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // Tạo tệp PDF giả lập
    const blobPDF = new Blob(['Simulated PDF content'], { type: 'application/pdf' })
    const url = URL.createObjectURL(blobPDF)
    setUrlPDF(url)
    setIsConverting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto shadow-lg transform transition-all hover:shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Chuyển đổi ảnh sang PDF
            </CardTitle>
            <CardDescription>
              Tải lên ảnh của bạn và chuyển đổi chúng thành tệp PDF một cách dễ dàng.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Component Tải lên tệp */}
            <TaiLenTep onTaiLenTep={xuLyTaiLenTep} />

            {/* Danh sách ảnh đã tải lên */}
            {danhSachAnh.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Ảnh đã tải lên:</h3>
                <ul className="space-y-2">
                  {danhSachAnh.map((anh, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <ImageIcon className="mr-2 h-4 w-4 text-blue-500" />
                      {anh.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nút chuyển đổi và tiến trình */}
            <div className="space-y-4">
              <Button
                onClick={xuLyChuyenDoi}
                className="w-full transform transition-all duration-300 hover:scale-105"
                disabled={isConverting || danhSachAnh.length === 0}
              >
                {isConverting ? 'Đang chuyển đổi...' : 'Chuyển đổi sang PDF'}
              </Button>

              {isConverting && <Progress value={progress} className="w-full" />}
            </div>

            {/* Component Tải xuống PDF */}
            {urlPDF && <TaiXuongPDF urlPDF={urlPDF} />}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
