package lk.ijse.holybridge.service;

import lk.ijse.holybridge.dto.MemberDTO;
import java.util.List;

public interface MemberService {
    int saveMember(MemberDTO memberDTO);
    int updateMember(MemberDTO memberDTO);
    int deleteMember(int id);
    List<MemberDTO> getAllMembers();
    MemberDTO getMemberById(int id);
}