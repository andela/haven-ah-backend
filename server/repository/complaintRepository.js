import Model from '../models';
import getPaginationMeta from '../utilities/getPaginationMeta';

const {
  Complaint
} = Model;

/**
 * Complaint repository class
 */
class ComplaintRepository {
  /**
   * Function to get all complaints in the database
   * @param { integer } limit
   * @param { integer } page
   * @returns { object | null }
   ** otherwise it throws an error
   */
  static async getComplaints(limit = 10, page = 1) {
    const offset = limit * (page - 1);
    const complaintRecords = await Complaint.findAndCountAll({
      limit,
      offset
    });
    complaintRecords.meta = getPaginationMeta(limit, page, complaintRecords.count);
    return complaintRecords;
  }

  /**
   * Function to respond to particular complaint
   * in the database
   * @param { string } reply
   * @param { integer } id
   * @returns { object | null }
   ** otherwise it throws an error
   */
  static async replyComplaints(reply, id) {
    const complaint = await Complaint.findOne({
      where: {
        id
      }
    });
    if (!complaint) {
      return null;
    }
    return complaint.update({
      adminAction: reply
    });
  }
}

export default ComplaintRepository;
