import Content from "../models/ContentModel.js";

export const approveContent = async (req , res) => {

try {

    const contentId = req.params.id;

    const content = await Content.findByPk(contentId);

    if(!content) {
        return res.status(404).json({message : " content not found"});

    }


     if (content.status !== "pending") {
      return res.status(400).json({
        message: "Only pending content can be approved"
      });
    }
    
    content.status = "approved";
    content.approved_by = req.user.id;
    content.approved_at = new Date();

    await content.save();

    res.json({message: "Content approved successfully", content});
}
catch (err){
    res.status(500).json({message: err.message});
}

};



export const rejectContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const { reason } = req.body;

    const content = await Content.findByPk(contentId);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

      if (content.status !== "pending") {
      return res.status(400).json({
        message: "Only pending content can be rejected"
      });
    }


    content.status = "rejected";
    content.rejection_reason = reason;

    await content.save();

    res.json({
      message: "Content rejected successfully",
      content
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};