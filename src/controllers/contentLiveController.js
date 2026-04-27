import Content from "../models/ContentModel.js";


export const getLiveContent = async (req, res) => {
  try {
    const { teacherId } = req.params;


    if (!teacherId || isNaN(teacherId)) {
      return res.json({
        message: "No content available",
        data: []
      });
    }

   
    const now = new Date();
    console.log("NOW (UTC):", now);

    const contents = await Content.findAll({
      where: {
        uploaded_by: teacherId,
        status: "approved"
      },
      order: [["rotation_order", "ASC"]]
    });



     if (!contents || contents.length === 0) {
      return res.json({
        message: "No content available",
        data: []
      });
    }

    const activeContent = contents.filter((item) => {
      if (!item.start_time || !item.end_time) return false;

      const start = new Date(item.start_time);
      const end = new Date(item.end_time);


      console.log("---- CHECKING CONTENT ----");
  console.log("START:", start);
  console.log("END:", end);
  console.log("NOW:", now);
  console.log("RESULT:", now >= start && now <= end);

      return now >= start && now <= end;
    });


    if (activeContent.length === 0) {
      return res.json({
        message: "No content available",
        data: []
      });
    }



    const validContent = activeContent.filter(
      (item) => item.duration && item.rotation_order
    );

    if (validContent.length === 0) {
      return res.json({
        message: "Invalid rotation setup",
        data: []
      });
    }

   



    const totalDuration = validContent.reduce(
  (sum, item) => sum + (item.duration || 0),
  0
);

if (totalDuration === 0) {
  return res.json({
    message: "Invalid rotation setup",
    data: []
  });
}

const currentTime = Date.now();
const totalDurationMs = totalDuration * 60 * 1000;

const currentSlot = currentTime % totalDurationMs;

let cumulative = 0;
let selectedContent = null;

for (let item of validContent) {
  cumulative += item.duration * 60 * 1000;

  if (currentSlot < cumulative) {
    selectedContent = item;
    break;
  }
}


if (!selectedContent) {
      selectedContent = validContent[0];
    }

    return res.json({
      message: "Live content fetched successfully",
      data:{
          id: selectedContent.id,
  title: selectedContent.title,
  subject: selectedContent.subject,
  file_url: selectedContent.file_url
      }
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};