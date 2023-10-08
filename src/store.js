
import {create} from "zustand";
import { persist } from "zustand/middleware";
export const useStore = create(
  persist(
    (set) => ({
    
      student: [],
      courses: [],
      attendence: [],
      addStudent: (dishData) => {
        console.log(dishData,"dishData")
        set({ student: dishData });
      },
      addCourses: (venueData) => {
        set({ courses: venueData });
      },
      addAttendence: (menuData) => {
        set({ attendence: menuData });
      }
    }),
    {
      name: "userStore",
      getStorage: () => localStorage,
    }
  )
);
