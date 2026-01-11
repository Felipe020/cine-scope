'use server'

import { UserService } from "@/lib/services/UserService";
import { MovieService } from "@/lib/services/MovieService";
import { revalidatePath } from "next/cache";

export async function deleteUser(id: string) {
  try {
    await UserService.delete(id);
    revalidatePath('/admin/users');
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
}

export async function promoteUserToCritic(id: string) {
    try {
        await UserService.promoteToCritic(id);
        revalidatePath('/admin/users');
    } catch (error) {
        console.error("Failed to promote user:", error);
    }
}

export async function deleteMovie(id: string) {
  try {
    await MovieService.delete(id);
    revalidatePath('/admin/movies');
  } catch (error) {
    console.error("Failed to delete movie:", error);
  }
}
