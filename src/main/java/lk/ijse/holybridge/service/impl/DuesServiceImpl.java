package lk.ijse.holybridge.service.impl;

import lk.ijse.holybridge.dto.DuesDTO;
import lk.ijse.holybridge.dto.MemberDTO;
import lk.ijse.holybridge.entity.Dues;
import lk.ijse.holybridge.entity.Member;
import lk.ijse.holybridge.repo.DuesRepository;
import lk.ijse.holybridge.repo.MemberRepository;
import lk.ijse.holybridge.service.DuesService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DuesServiceImpl implements DuesService {

    private final DuesRepository duesRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public DuesServiceImpl(DuesRepository duesRepository, MemberRepository memberRepository) {
        this.duesRepository = duesRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    public int saveDues(DuesDTO duesDTO) {
        Optional<Member> member = memberRepository.findById(duesDTO.getMember().getMemberId());
        if (!member.isPresent()) {
            return VarList.Not_Found;
        }

        Dues dues = new Dues();
        dues.setAmount(duesDTO.getAmount());
        dues.setDueDate(duesDTO.getDueDate());
        dues.setMember(member.get());

        duesRepository.save(dues);
        return VarList.Created;
    }

    @Override
    public int updateDues(DuesDTO duesDTO) {
        Optional<Dues> optionalDues = duesRepository.findById(duesDTO.getDuesId());
        if (!optionalDues.isPresent()) {
            return VarList.Not_Found;
        }

        Dues dues = optionalDues.get();
        dues.setAmount(duesDTO.getAmount());
        dues.setDueDate(duesDTO.getDueDate());

        if (duesDTO.getMember() != null) {
            Optional<Member> member = memberRepository.findById(duesDTO.getMember().getMemberId());
            if (!member.isPresent()) {
                return VarList.Not_Found;
            }
            dues.setMember(member.get());
        }

        duesRepository.save(dues);
        return VarList.OK;
    }

    @Override
    public int deleteDues(int id) {
        if (!duesRepository.existsById(id)) {
            return VarList.Not_Found;
        }
        duesRepository.deleteById(id);
        return VarList.OK;
    }

    @Override
    public List<DuesDTO> getAllDues() {
        return duesRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DuesDTO getDuesById(int id) {
        Optional<Dues> dues = duesRepository.findById(id);
        return dues.map(this::convertToDTO).orElse(null);
    }

    @Override
    public List<DuesDTO> getDuesByMember(int memberId) {
        return duesRepository.findByMember_MemberId(memberId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private DuesDTO convertToDTO(Dues dues) {
        DuesDTO dto = new DuesDTO();
        dto.setDuesId(dues.getDuesId());
        dto.setAmount(dues.getAmount());
        dto.setDueDate(dues.getDueDate());

        // Convert Member to MemberDTO
        Member member = dues.getMember();
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setMemberId(member.getMemberId());
        memberDTO.setName(member.getName());
        memberDTO.setContactNumber(member.getContactNumber());
        memberDTO.setAddress(member.getAddress());
        memberDTO.setGender(member.getGender());
        // Add other fields as needed

        dto.setMember(memberDTO);
        return dto;
    }
}