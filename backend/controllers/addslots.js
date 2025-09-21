import doctormodel from "../models/doctorModel.js";

const addslots = async (req, res) => {
  try {
    const { day, times, docid } = req.body;

    // 1. Check doctor exists
    const doctor = await doctormodel.findById(docid);
    if (!doctor) {
      return res.send({ success: false, message: "Doctor does not exist" });
    }

    // 2. Push new day + times
    doctor.slots.push({
      day,
      times: times.map(t => ({ time: t, isBooked: false }))
    });

    // 3. Save instance
    await doctor.save();

    res.send({ success: true, message: "Slot added successfully", doctor });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export { addslots };
