"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"
import { fetchTimeline } from "@/redux/slices/timelineSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import {
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Award,
  Clock,
  Sparkles,
  Target,
} from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api"

const TimelineManager = () => {
  const dispatch: AppDispatch = useDispatch()
  const { items: timeline, status } = useSelector((state: RootState) => state.timeline)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  useEffect(() => {
    dispatch(fetchTimeline())
  }, [dispatch])

  const handleAddNew = () => {
    setCurrentItem({
      _id: null,
      title: "",
      company: "",
      year: "",
      description: "",
      type: "education",
      achievements: [],
    })
    setIsModalOpen(true)
  }

  const handleEdit = (item) => {
    setCurrentItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token")
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${API_URL}/timeline/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        dispatch(fetchTimeline())
      } catch (error) {
        console.error("Failed to delete timeline item", error)
      }
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "work" ? (
      <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
    ) : (
      <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
    )
  }

  const getTypeColor = (type: string) => {
    return type === "work"
      ? "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
      : "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
  }

  const getTypeBadgeColor = (type: string) => {
    return type === "work"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-0">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Timeline Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
            Manage your career timeline and milestones
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Timeline Items */}
      <div className="space-y-4 sm:space-y-6">
        {status === "loading" ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          timeline.map((item) => (
            <Card
              key={item._id}
              className={`group relative overflow-hidden bg-gradient-to-r ${getTypeColor(
                item.type,
              )} border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02]`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent dark:from-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative pb-3 sm:pb-4 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                    <div
                      className={`p-1.5 sm:p-2 rounded-xl ${item.type === "work" ? "bg-blue-500/20" : "bg-emerald-500/20"
                        } group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                    >
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors leading-tight">
                        {item.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Building className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                        <CardDescription className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base truncate">
                          {item.company}
                        </CardDescription>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-2 flex-shrink-0">
                    <Badge className={`${getTypeBadgeColor(item.type)} border-0 text-xs sm:text-sm px-2 py-1`}>
                      {item.type === "work" ? "Work" : "Education"}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="font-medium">{item.year}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                    <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Description
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                    {item.description}
                  </p>
                </div>

                {item.achievements && item.achievements.length > 0 && (
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <Award className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        Key Achievements
                      </span>
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {item.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed text-sm sm:text-base">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="w-full sm:w-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 rounded-xl text-sm px-3 py-2"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                    className="w-full sm:w-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 text-red-600 hover:text-red-700 rounded-xl text-sm px-3 py-2"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {isModalOpen && currentItem && (
        <TimelineFormModal
          item={currentItem}
          onClose={() => {
            setIsModalOpen(false)
            setCurrentItem(null)
          }}
          onSave={() => {
            setIsModalOpen(false)
            setCurrentItem(null)
            dispatch(fetchTimeline())
          }}
        />
      )}
    </div>
  )
}

const TimelineFormModal = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: item?.title || "",
    company: item?.company || "",
    year: item?.year || "",
    description: item?.description || "",
    type: item?.type || "education",
    achievements: Array.isArray(item?.achievements) ? item.achievements.join("\n") : "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const dataToSubmit = {
      ...formData,
      achievements: formData.achievements.split("\n").filter(Boolean),
    }

    try {
      if (item._id) {
        await axios.put(`${API_URL}/timeline/${item._id}`, dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        })
      } else {
        await axios.post(`${API_URL}/timeline`, dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        })
      }
      onSave()
    } catch (error) {
      console.error("Failed to save timeline item", error)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl overflow-y-auto">
        <DialogHeader className="space-y-3 sm:space-y-4 pb-4 sm:pb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                {item._id ? "Edit Timeline Item" : "Add New Timeline Item"}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                {item._id ? "Update your timeline entry." : "Add a new milestone to your timeline."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-purple-500" />
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="Position title or degree..."
                required
              />
            </div>

            {/* Company and Year */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="company"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Building className="h-4 w-4 text-blue-500" />
                  Company/Institution
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Company or institution name..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="year"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  Year
                </Label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="2023 or 2020-2023..."
                  required
                />
              </div>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-500" />
                Type
              </Label>
              <Select onValueChange={handleSelectChange} defaultValue={formData.type}>
                <SelectTrigger className="h-10 sm:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work Experience</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <Target className="h-4 w-4 text-rose-500" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="min-h-[80px] sm:min-h-[100px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                placeholder="Describe your role and responsibilities..."
                required
              />
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <Label
                htmlFor="achievements"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                <Award className="h-4 w-4 text-yellow-500" />
                Achievements
              </Label>
              <Textarea
                id="achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                className="min-h-[80px] sm:min-h-[100px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                placeholder="List your key achievements (one per line)..."
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              {item._id ? "Update Item" : "Create Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TimelineManager
