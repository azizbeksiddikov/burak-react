import { Member } from "../../lib/types/member";
import { serverApi } from "../../lib/config";
import axios from "axios";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = `${this.path}/member/top-users`;
      const result = await axios.get(url);
      console.log("result.data in getTopUsers:", result.data);

      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers", err);
      throw err;
    }
  }
}

export default MemberService;
