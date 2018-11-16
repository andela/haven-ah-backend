import complaintRepo from '../repository/complaintRepository';
import { badHttpResponse, goodHttpResponse, paginatedHttpResponse } from '../utilities/httpResponse';


/**
 * Complaints Controller class
 */
class Complaints {
  /**
   * Get all complaints
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Object
   */
  static async getComplaints(request, response) {
    const limit = parseInt(request.query.limit, 10) || 10;
    const page = parseInt(request.query.page, 10) || 1;

    const complaints = await complaintRepo.getComplaints(limit, page);
    if (!complaints.count) {
      return goodHttpResponse(response, 200, 'No complaints found');
    }
    return paginatedHttpResponse(response, 200, 'Complaints retrieved', complaints);
  }

  /**
   * A function to reply user complaints
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Object
   */
  static async replyComplaints(request, response) {
    const { reply } = request.body;
    const { complaintId } = request.params;
    const complaint = await complaintRepo.replyComplaints(reply, complaintId);
    if (!complaint) {
      return badHttpResponse(response, 404, 'Complaint not found');
    }
    return goodHttpResponse(response, 200, 'Complaint addressed');
  }
}

export default Complaints;
