import { createClient } from "@/lib/supabase/client"

export async function logActivity(
  action: "create" | "update" | "delete",
  section: string,
  description?: string,
  oldData?: any,
  newData?: any,
) {
  try {
    const supabase = createClient()

    const { data: user } = await supabase.auth.getUser()
    if (!user.user) return

    const { error } = await supabase.from("cms_activity_log").insert({
      user_id: user.user.id,
      action,
      section,
      description,
      old_data: oldData,
      new_data: newData,
    })

    if (error) {
      console.error("Error logging activity:", error)
    }
  } catch (error) {
    console.error("Error in logActivity:", error)
  }
}
