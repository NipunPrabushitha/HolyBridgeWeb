package lk.ijse.holybridge.service.impl;

import lk.ijse.holybridge.dto.MemberDTO;
import lk.ijse.holybridge.dto.ParishDTO;
import lk.ijse.holybridge.entity.Member;
import lk.ijse.holybridge.entity.Parish;
import lk.ijse.holybridge.repo.MemberRepository;
import lk.ijse.holybridge.repo.ParishRepository;
import lk.ijse.holybridge.service.MemberService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final ParishRepository parishRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository, ParishRepository parishRepository) {
        this.memberRepository = memberRepository;
        this.parishRepository = parishRepository;
    }

    @Override
    public int saveMember(MemberDTO memberDTO) {
        if (memberRepository.existsByContactNumber(memberDTO.getContactNumber())) {
            return VarList.Not_Acceptable;
        }

        Optional<Parish> parish = parishRepository.findById(memberDTO.getParishDTO().getParishId());
        if (!parish.isPresent()) {
            return VarList.Not_Found;
        }

        Member member = new Member();
        member.setName(memberDTO.getName());
        member.setAddress(memberDTO.getAddress());
        member.setContactNumber(memberDTO.getContactNumber());
        member.setGender(memberDTO.getGender());
        member.setImagepath(memberDTO.getImagepath());
        member.setDateOfBirth(memberDTO.getDateOfBirth());
        member.setParish(parish.get());

        memberRepository.save(member);
        return VarList.Created;
    }

    @Override
    public int updateMember(MemberDTO memberDTO) {
        Optional<Member> optionalMember = memberRepository.findById(memberDTO.getMemberId());
        if (!optionalMember.isPresent()) {
            return VarList.Not_Found;
        }

        Member member = optionalMember.get();
        member.setName(memberDTO.getName());
        member.setAddress(memberDTO.getAddress());
        member.setContactNumber(memberDTO.getContactNumber());
        member.setGender(memberDTO.getGender());
        member.setImagepath(memberDTO.getImagepath());
        member.setDateOfBirth(memberDTO.getDateOfBirth());

        if (memberDTO.getParishDTO() != null) {
            Optional<Parish> parish = parishRepository.findById(memberDTO.getParishDTO().getParishId());
            if (parish.isPresent()) {
                member.setParish(parish.get());
            }
        }

        memberRepository.save(member);
        return VarList.OK;
    }

    @Override
    public int deleteMember(int id) {
        if (!memberRepository.existsById(id)) {
            return VarList.Not_Found;
        }
        memberRepository.deleteById(id);
        return VarList.OK;
    }

    @Override
    public List<MemberDTO> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MemberDTO getMemberById(int id) {
        Optional<Member> member = memberRepository.findById(id);
        return member.map(this::convertToDTO).orElse(null);
    }

    private MemberDTO convertToDTO(Member member) {
        MemberDTO dto = new MemberDTO();
        dto.setMemberId(member.getMemberId());
        dto.setName(member.getName());
        dto.setAddress(member.getAddress());
        dto.setContactNumber(member.getContactNumber());
        dto.setGender(member.getGender());
        dto.setImagepath(member.getImagepath());
        dto.setDateOfBirth(member.getDateOfBirth());

        Parish parish = member.getParish();
        ParishDTO parishDTO = new ParishDTO();
        parishDTO.setParishId(parish.getParishId());
        parishDTO.setName(parish.getName());
        // Add other parish fields if needed

        dto.setParishDTO(parishDTO);
        return dto;
    }
}