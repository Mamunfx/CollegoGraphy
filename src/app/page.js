
import { College_review } from "./components/College_review";
import { Graduate_Group_pic } from "./components/Graduate_Group_pic";
import { Research_paper } from "./components/Research_paper";
import TopColleges from "./topColleges/page";

export default function Home() {
  return (
    <div className="space-y-16 my-8">
      <TopColleges></TopColleges>
      <Graduate_Group_pic></Graduate_Group_pic>
      <Research_paper></Research_paper>
      <College_review></College_review>
    </div>
  );
}
