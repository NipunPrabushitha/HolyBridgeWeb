package lk.ijse.holybridge.service.impl;

import lk.ijse.holybridge.dto.CategoryDTO;
import lk.ijse.holybridge.entity.Category;
import lk.ijse.holybridge.repo.CategoryRepository;
import lk.ijse.holybridge.service.CategoryService;
import lk.ijse.holybridge.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public int saveCategory(CategoryDTO categoryDTO) {
        if (categoryRepository.existsByName(categoryDTO.getName())) {
            return VarList.Not_Acceptable;
        }
        Category category = new Category(
                categoryDTO.getName(),
                categoryDTO.getDescription()

        );
        categoryRepository.save(category);
        return VarList.Created;
    }

    @Override
    public int updateCategory(CategoryDTO categoryDTO) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryDTO.getId());
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setName(categoryDTO.getName());
            category.setDescription(categoryDTO.getDescription());
            categoryRepository.save(category);
            return VarList.OK;
        }
        return VarList.Not_Found;
    }

    @Override
    public int deleteCategory(int id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return VarList.OK;
        }
        return VarList.Not_Found;
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());
    }
}