// const retellClient = require("../config/retell");

// exports.makeCall = async (req, res) => {
//   try {
//     const { phone } = req.body;

//     if (!phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone number is required",
//       });
//     }

//     console.log("Initiating call to:", phone);

//     const call = await retellClient.call.createPhoneCall({
//       from_number: process.env.MY_NUMBER,
//       to_number: phone,
//       agent_id: process.env.RETELL_AGENT_ID, // 🔥 REQUIRED
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Call initiated successfully",
//       call_id: call.call_id,
//       agent_id: call.agent_id,
//     });
//   } catch (error) {
//     console.error("Retell Call Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to initiate call",
//       error: error.message,
//     });
//   }
// };

const retellClient = require("../config/retell");

exports.makeCall = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const call = await retellClient.call.createPhoneCall({
      from_number: process.env.MY_NUMBER,
      to_number: phone,
      agent_id: process.env.RETELL_AGENT_ID,
    });

    return res.status(200).json({
      success: true,
      message: "Call initiated",
      call_id: call.call_id,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to initiate call",
    });
  }
};

