import Content from "../models/ContentModel.js";


export const uploadContent = async (req, res) => {
  try {
    const { title, subject, description , start_time, end_time  , rotation_order , duration} = req.body;

    const file = req.file;


      if (!start_time || !end_time) {
      return res.status(400).json({
        message: "start_time and end_time are required"
      });
    }

    const content = await Content.create({
      title,
      subject,
      description,
       start_time,
      end_time,
       rotation_order,
      duration,
      file_url: file.path,
      file_type: file.mimetype,
      file_size: file.size,
      uploaded_by: req.user.id,
      status: "pending",
     
    });

    console.log("BODY:", req.body);
console.log("FILE:", req.file);

    res.json({
      message: "Content uploaded successfully",
      content
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getAllContent = async (req, res) => {
  try {
    const { subject, status, page = 1, limit = 5 } = req.query;

    const offset = (page - 1) * limit;

    const where = {};

    if (subject) where.subject = subject;
    if (status) where.status = status;

    const contents = await Content.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]]
    });

    res.json({
      message: "Content fetched successfully",
      data: contents
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getMyContent = async (req, res) => {
  try {
    const userId = req.user.id;

    const contents = await Content.findAll({
      where: { uploaded_by: userId },
      order: [["createdAt", "DESC"]]
    });

    res.json({
      message: "Your content fetched successfully",
      data: contents
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};